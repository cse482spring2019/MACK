"""unweaver CLI."""
import click

from unweaver.build import build_graph
from unweaver.server import run_app
from unweaver.weight import precalculate_weights


@click.group()
def unweaver():
    pass


@unweaver.command()
@click.argument("directory", type=click.Path("r"))
@click.option("--changes-sign", multiple=True)
def build(directory, changes_sign):
    click.echo("Building graph...")
    # TODO: catch errors in starting server
    # TODO: spawn process?
    build_graph(directory, changes_sign=changes_sign)
    click.echo("Done.")


@unweaver.command()
@click.argument("directory", type=click.Path("r"))
def weight(directory):
    click.echo("Calculating static weights...")
    # TODO: catch errors in starting server
    # TODO: spawn process?
    precalculate_weights(directory)
    click.echo("Done.")


@unweaver.command()
@click.argument("directory", type=click.Path("r"))
@click.option("--host", "-h", default="localhost")
@click.option("--port", "-p", default=8000)
@click.option("--debug", is_flag=True)
def run(directory, host, port, debug=False):
    click.echo("Starting server in {}...".format(directory))
    # TODO: catch errors in starting server
    # TODO: spawn process?
    run_app(directory, host=host, port=port, debug=debug)
