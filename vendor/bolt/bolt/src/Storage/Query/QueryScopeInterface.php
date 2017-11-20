<?php

namespace Bolt\Storage\Query;

/**
 * Interface QueryScopeInterface
 * Interface defines a class that provides additional scoping for a Query.
 *
 * @author Ross Riley <riley.ross@gmail.com>
 */
interface QueryScopeInterface
{
    public function onQueryExecute(QueryInterface $query);
}
