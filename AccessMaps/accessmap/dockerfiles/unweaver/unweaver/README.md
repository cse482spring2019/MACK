## Warning: this software is pre-alpha and subject to massive changes. Pin to commits if you use it.

# Unweaver

Unweaver is a routing engine focused on flexibility. It can read many data formats
(including OpenStreetMap), find shortest-path routes via a web API, and allows
completely customizable combinations of cost functions and directions specifications,
summarized in "profiles". Unweaver's costing strategy includes dynamics (as opposed
to precalculated) edge costs for when profiles need to be heavily parameterized on a
per-user basis.

Note: on-the-fly custom costing precludes certain strategies for rapidly finding
shortest paths within large graphs (e.g., you can't use contraction hierarchies). We
plan to add contraction hierarchies (and other strategies) to the upstream `entwiner`
package for static cost functions.

## Data format flexibility

Unweaver was written with OpenStreetMap in mind, but can consume almost any linear
spatial data through its use of [entwiner](https://github.com/nbolten/entwiner).

Because Unweaver uses `entwiner`, the graph representation is an SQLite database that
can be shared between services or published as open data. Unweaver can be run in
in-memory or on-disk modes so that you can choose your own trade-off between speed
(in-memory is faster) and memory (on-disk is very low-memory).

## Profiles

In Unweaver, a routing profile is essentially just a combination of a cost function
and a directions generator. The cost function defines how much of a penalty is incurred
when traveling along a particular edge and the directions generator creates JSON that
describes the results for API consumers, e.g. turn-by-turn directions.

A profile is a JSON file that references:

1. A cost function

2. A directions generator

3. Additional metadata, including a name for the profile

### Customized costing of shortest paths

One of the chief limitations of most routing engines is that edge costs are baked into
the graph: if you want to route for a certain vehicle type, the most you can do is
write some code that creates a single number that is attached to every street line.

While the baked-in approach can be efficient for calculations (and Unweaver does
allow precalculated costs), there are situations where it is inadequate for tackling
a particular shortest-path challenge. For example, Unweaver spun out of the AccessMap
project, which is focused on pedestrian wayfinding: pedestrians have a wide range of
preferences that are not easily summed up in one or two preset costs, and requires
personalizizing cost functions on a per-user basis.

Unweaver achieves flexible, dynamic costing by leveraging Python: all cost functions
are defined as simple Python functions. This means that you can include any of the
fantastic numerical and scientific libraries for Python in your cost function: `numpy`,
`scipy`, `pandas`, etc (make sure to install them first).

Unweaver cost functions are directly compatible with `networkx` cost functions: they
take in three direction parameters: start node (`u`), end node (`v`), and dict-like
attribute data (`d`) and return a cost (number) representing the penalty of traversal
(return `None` for an infinite cost / non-traversible edge).

### Directions

Directions generators are just Python function that receive a list of node lists (i.e.
one or more paths) along with a list of edge lists (the edges traversed by each path)
and return a JSON-compatible Python object, ideally a dictionary. There will be
several built-in default directions generators as example. Because they are Python
functions, they can also use arbitrarily complex code and other Python libraries.

Please note that the node list-of-lists and edge list-of-lists may become generators
at some point (for low-memory environments), so you should assume that you can only
iterate over each initial nested list, node, or edge a single time.

## Web API

Unweaver comes with a built-in web API generator (WIP - it is currently hard-coded).

The purpose of the API generator is to translate customized cost functions into
web API routes and parameters, allowing you to be completely free in how you want
users to interact with your application.
