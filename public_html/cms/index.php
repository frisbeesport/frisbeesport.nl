<?php

/** @var Silex\Application|false $app */

// If we're running PHP's built-in webserver, `web.php` returns `false`,
// meaning the path is a file. If so, we pass it along.
if ($app === false) {
    return false;
}

$app->run();
