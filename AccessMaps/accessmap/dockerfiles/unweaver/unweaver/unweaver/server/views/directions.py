from flask import g, jsonify

from ...algorithms.shortest_path import route_legs, waypoint_legs, NoPathError

import click


def blacklist_waypoints(bwp, blacklist):
    for bbwp in bwp.values():
        node1 = bbwp['edge']['_u']
        node2 = bbwp['edge']['_v']

        blacklist.add((node1, node2))
        blacklist.add((node2, node1))


def add_blacklist(blacklist, coord_list, cost_function):
    for i in range(len(coord_list) // 4):
        blon1 = coord_list[4 * i]
        blat1 = coord_list[4 * i + 1]
        blon2 = coord_list[4 * i + 2]
        blat2 = coord_list[4 * i + 3]
        blacklist_legs = waypoint_legs(g.G, [[blon1, blat1], [blon2, blat2]], cost_function)
        for i, (bwp1, bwp2) in enumerate(blacklist_legs):
            if bwp1 is None or bwp2 is None:
                return jsonify(
                    {
                        "status": "InvalidWaypointBlacklist",
                        "msg": "Cannot route from blacklist waypoint {}".format(i + 1),
                        "status_data": {"index": i},
                    }
                )

            blacklist_waypoints(bwp1, blacklist)
            blacklist_waypoints(bwp2, blacklist)

    return None


def directions_view(view_args, cost_function, directions_function):
    click.echo("Directions view endpoint hit " + str(view_args))

    lon1 = view_args["lon1"]
    lat1 = view_args["lat1"]
    lon2 = view_args["lon2"]
    lat2 = view_args["lat2"]
    blacklist = set()
    #view_args['blacklist'] = [-122.3343196, 47.599956, -122.3343161, 47.5983948]
    if 'blacklist' in view_args:
        err = add_blacklist(blacklist, view_args['blacklist'], cost_function)
        if err is not None:
            return err

    print('blacklists:', blacklist)

    legs = waypoint_legs(g.G, [[lon1, lat1], [lon2, lat2]], cost_function)
    for i, (wp1, wp2) in enumerate(legs):
        if wp1 is None:
            return jsonify(
                {
                    "status": "InvalidWaypoint",
                    "msg": "Cannot route from waypoint {}".format(i + 1),
                    "status_data": {"index": i},
                }
            )
        if wp2 is None:
            return jsonify(
                {
                    "status": "InvalidWaypoint",
                    "msg": "Cannot route to waypoint {}".format(i + 2),
                    "status_data": {"index": i + 1},
                }
            )

    def cost_function_blacklist(u, v, ddict):
        if (u, v) in blacklist:
            #print('\tblacklisted', u, v)
            return float('inf')
        if (v, u) in blacklist:
            #print('\tblacklisted', u, v)
            return float('inf')

        return cost_function(u, v, ddict)

    try:
        cost, path, edges = route_legs(g.G, legs, cost_function_blacklist)
        print('cost of path:', cost)
    except NoPathError:
        return jsonify({"status": "NoPath", "msg": "No path found."})

    origin = {
        "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [lon1, lat1]},
        "properties": {},
    }
    destination = {
        "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [lon2, lat2]},
        "properties": {},
    }

    directions = directions_function(origin, destination, cost, path, edges)

    return jsonify(directions)
