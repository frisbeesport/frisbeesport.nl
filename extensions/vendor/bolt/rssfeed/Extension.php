<?php

namespace Bolt\Extension\Bolt\RSSFeed;

/**
 * RSS feeds extension for Bolt, originally by WeDesignIt, Patrick van Kouteren
 *
 * @author Patrick van Kouteren <info@wedesignit.nl>
 * @author Gawain Lynch <gawain.lynch@gmail.com>
 */
class Extension extends \Bolt\BaseExtension
{
    const NAME = 'RSSFeed';

    /**
     * @return string
     */
    public function getName()
    {
        return Extension::NAME;
    }

    public function initialize()
    {
        // Set up routes
        $this->setController();
    }

    /**
     * Set default config
     *
     * @return array
     */
    protected function getDefaultConfig()
    {
        return array(
            'sitewide' => array(
                'enabled'        => true,
                'feed_records'   => 10,
                'feed_template'  => 'rss.twig',
                'content_length' => 0,
                'content_types'  => array('pages')
                )
        );
    }

    /**
     * Create controller and define routes
     */
    private function setController()
    {
        // Create controller object
        $this->controller = new Controller($this->app);

        // Contenttype specific feed(s)
        $this->app->match('/rss/{afdeling}/', array($this->controller, 'feed'))
            ->assert('cafdeling', 'ultimate|discgolf|organisatie|spelers|nieuws|persberichten');
    }
}
