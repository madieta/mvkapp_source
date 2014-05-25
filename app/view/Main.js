Ext.define('mvkapp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.data.JsonP',
        'Ext.Toolbar',
        'Ext.Audio',
        'mvkapp.view.FilterView'
    ],
    config: {

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            items: [
                {
                    xtype: 'textfield',
                    label: 'Keywords:',
                    labelWidth: '90px',
                    id: 'field_tags'
                },
                {
                    xtype: 'button',
                    action: 'load_flickr',
                    text: 'Go!'
                },                
                {
                    xtype: 'button',
                    text: 'About',
                    action: 'show_about'
                }
            ]
        },
        {
            xtype: 'toolbar',
            id: 'player_container',
            hidden: true,
            docked: 'top',
            items: [
                {
                    xtype: 'audio',
                    id: 'player',
                    url: '',
                    hidden: true
                },
                {
                    xtype: 'button',
                    action: 'play_music',
                    text: 'Play music'
                },
                {
                    xtype: 'button',
                    text: 'Show tags',
                    action: 'show_tags'
                }
            ]
        },
        {
            xtype: 'panel',
            scrollable: true,
            id: 'bigpanel',
            height: '100%',
            style: {
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'black'
            },
            items: [
                {
                    xtype: 'panel',
                    id: 'debug_flickr',
                    html: 'Debug flickr text will show here',
                    hidden: true
                },
                {
                    xtype: 'panel',
                    id: 'debug_soundcloud',
                    html: 'Debug soundclound text will show here',
                    hidden: true
                },
                {
                    xtype: 'panel',
                    docked: 'bottom',
                    style: {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    },

                    items: [
                        {
                            xtype: 'panel',
                            id: 'image_id',
                            html: '',
                            hidden: true
                        },
                        {
                            xtype: 'panel',
                            id: 'error_msg',
                            html: '',
                            hidden: false,
                            style: {
                                color: 'red',
                                textShadow: '0.1em 0.1em #000'
                            }                        },
                        {
                            xtype: 'panel',
                            id: 'image_info',
                            html: '',
                            hidden: false,
                            style: {
                                color: '#FFFFFF',
                                textShadow: '0.1em 0.1em #000'
                            }
                        },
                        {
                            xtype: 'panel',
                            id: 'image_tags',
                            hidden: true,
                            style: {
                                color: '#FFFFFF',
                                textShadow: '0.1em 0.1em #000'
                            }
                       },
                        {
                            xtype: 'panel',
                            id: 'music_info',
                            html: '',
                            hidden: false,
                            style: {
                                color: '#FFFFFF',
                                textShadow: '0.1em 0.1em #000'
                            }
                        },
                        {
                            xtype: 'panel',
                            id: 'music_tags',
                            hidden: true,
                            style: {
                                color: '#FFFFFF',
                                textShadow: '0.1em 0.1em #000'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            id: 'aboutthisapp',
            modal: true,
            hideOnMaskTap: true,
            showAnimation: {
                type: 'popIn',
                duration: 250,
                easing: 'ease-out'
            },
            hideAnimation: {
                type: 'popOut',
                duration: 250,
                easing: 'ease-out'
            },
            centered: true,
            width: Ext.os.deviceType == 'Phone' ? '90%' : 420,
            height: Ext.os.deviceType == 'Phone' ? '90%' : 420,
            styleHtmlContent: true,
            html: "<p>'Flickr sounds' is an HTML5 Mash-up app developed by Maria Vilar&oacute; (madieta@gmail.com) \
            using <a href=\"http://flickr.com\" target=\"_blank\">Flickr</a> and <a href=\"http://soundcloud.com\" target=\"_blank\">Soundcloud</a> APIs</p> \
            <p><b>Use</b>: Just press 'Go!'. A picture from Flickr will show up (related to the keywords if entered, \
            or the most interesting picture of the day if left blank) \
            and then it will load a track from Soundcloud using the tags of the picture (so it probably \
            won't be related at all with the original keywords!)</p>\
            <p>Sometimes music won't play due to some Soundclound bug. Sorry and try again or with other keywords</p>",
            items: [
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    title: 'About'
                }
            ],
            scrollable: true
        }
    ]
    }
});
