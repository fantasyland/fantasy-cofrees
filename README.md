# Fantasy Cofrees

The Cofree Comonad for Functors.

## Examples

Non-empty list using Cofree and Option:

    var nel = Cofree(
        1,
        Option.Some(
            Cofree(
                2,
                Option.None
            )
        )
    );
