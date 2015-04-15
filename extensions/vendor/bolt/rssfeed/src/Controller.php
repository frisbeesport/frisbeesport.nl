<?php

namespace Bolt\Extension\Bolt\RSSFeed;

use Symfony\Component\HttpFoundation\Response;

/**
 * RSSFeed Controller
 *
 * @author Patrick van Kouteren <info@wedesignit.nl>
 * @author Gawain Lynch <gawain.lynch@gmail.com>
 */
class Controller
{
    /**
     * @var Silex\Application
     */
    private $app;

    /**
     * @var Extension config array
     */
    private $config;

    public function __construct(\Bolt\Application $app)
    {
        $this->app = $app;
        $this->config = $this->app['extensions.' . Extension::NAME]->config;
    }

    public function feed($afdeling = '')
    {
        // jQuery not required
        $this->app['extensions']->disableJquery();

        // Clear snippet list. There's no clear any more, so just set to null
        $this->app['extensions']->clearSnippetQueue();
        $this->app['debugbar'] = false;

        // Defaults for later
        $defaultFeedRecords = 5;
        $defaultContentLength = 100;
        $defaultTemplate = 'rss.twig';
        $content = array();
        $contenttypes = array();

        // If we're on the front page, use sitewide configuration
        if ($contenttypeslug == '') {
            $contenttypeslug = 'nieuws';
        }

        if (!isset($this->config[$afdeling]['enabled']) ||
            $this->config[$afdeling]['enabled'] != 'true'
        ) {
            $this->app->abort(404, "Feed for '$afdeling' not found.");
        }

        // Better safe than sorry: abs to prevent negative values
        $amount = (int) abs((!empty($this->config[$afdeling]['feed_records']) ?
            $this->config[$afdeling]['feed_records'] : $defaultFeedRecords));

        // How much to display in the description. Value of 0 means full body!
        $contentLength = (int) abs(
            (!empty($this->config[$afdeling]['content_length']) ?
                $this->config[$afdeling]['content_length'] :
                0)
        );

        // Then, select which template to use, based on our
        // 'cascading templates rules'
        if (!empty($this->config[$afdeling]['feed_template'])) {
            $template = $this->config[$afdeling]['feed_template'];
        } else {
            $template = $defaultTemplate;
        }

        $this->app['twig.loader.filesystem']->addPath(dirname(__DIR__) . '/assets/');

        $body = $this->app['render']->render($template, array(
            'afdeling'           => $afdeling,
            'content_length'     => $contentLength
        ));

        return new Response($body, 200,
            array(
                'Content-Type'  => 'application/rss+xml; charset=utf-8',
                'Cache-Control' => 's-maxage=3600, public',
            )
        );
    }
}
