Ext.define('mvkapp.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            mainView: 'main',
            btnFlickr: 'main button[action=load_flickr]',
            fldTags: 'main textfield[id=field_tags]',
            btnPlayMusic: 'main button[action=play_music]',

            panelDebugFlickr: 'main component[id=debug_flickr]',
            panelImage_Id: 'main panel[id=image_id]',
            panelDebugSoundcloud: 'main panel[id=debug_soundcloud]',
            panelImage: 'main panel[id=bigpanel]',

            panelError: 'main panel[id=error_msg]',
            panelImageInfo: 'main panel[id=image_info]',
            panelImageTags: 'main panel[id=image_tags]',
            panelMusicInfo: 'main panel[id=music_info]',
            panelMusicTags: 'main panel[id=music_tags]',
            panelMusicPlayer: 'main audio',
            panelMusicPlayerContainer: 'main toolbar[id=player_container]',

            btnShowAbout: 'main button[action=show_about]',
            panelAbout: 'main panel[id=aboutthisapp]',
            btnShowTags: 'main button[action=show_tags]'

        },
        control: {
            'btnFlickr': {
                tap: 'onFlickr'
            },
            'fldTags': {
                action: 'onFlickr'
            },
            'btnSoundcloud': {
                tap: 'onSoundcloud'
            },
            'panelImage_Id': {
                updatedata: 'onImageReturned'
            },
            'panelImageInfo': {
                updatedata: 'onTagsLoad'
            },
            'btnPlayMusic': {
                tap: 'onPlayMusic'
            },
            'panelMusicPlayer': {
                updatedata: 'onMusicLoad'
            },
            'btnShowAbout': {
                tap: 'onShowAbout'
            },
            'btnShowTags': {
                tap: 'onShowTags'
            }
        }
    },
    
    onFlickr: function() {
        this.getPanelDebugFlickr().setHtml("");
        this.getPanelDebugSoundcloud().setHtml("");  
        this.getPanelError().setHtml("");
        this.getPanelImageInfo().setHtml("");
        this.getPanelImageTags().setHtml("");
        this.getPanelMusicInfo().setHtml("");
        this.getPanelMusicTags().setHtml("");
        this.getPanelMusicPlayer().setUrl(""); 
        this.getPanelMusicPlayerContainer().setHidden(true);
        this.getPanelAbout().hide();
        if (this.getFldTags().getValue()) {     
            mvkapp.utils.Functions.loadFlickrImages(this.getPanelImage_Id(),this.getFldTags().getValue(),this.getPanelError(),this.getPanelDebugFlickr());
        } else {
            mvkapp.utils.Functions.loadFlickrInterestingImages(this.getPanelImage_Id(),this.getPanelError(),this.getPanelDebugFlickr());
        }
    },

    onImageReturned: function() {
        mvkapp.utils.Functions.loadFlickrURL(this.getPanelImage_Id().getHtml(),this.getPanelImage(),this.getPanelError(),this.getPanelDebugFlickr());
        mvkapp.utils.Functions.loadFlickrTags(this.getPanelImage_Id().getHtml(),this.getPanelImageInfo(),this.getPanelImageTags(),this.getPanelError(),this.getPanelDebugFlickr());
    },

    onTagsLoad: function() {
        mvkapp.utils.Functions.loadSoundcloudTracks(this.getPanelImageTags().getHtml(),this.getPanelMusicInfo(),this.getPanelMusicTags(),this.getPanelMusicPlayer(),this.getPanelError(),this.getPanelDebugSoundcloud());
    },

    onMusicLoad: function() {
        if (this.getPanelMusicPlayer().getUrl().length>0) {
            this.getPanelMusicPlayerContainer().setHidden(false);
            this.onPlayMusic();
        }
    },

    onPlayMusic: function() {
        var audio = this.getPanelMusicPlayer();
            var button = this.getBtnPlayMusic();
            if (audio.isPlaying()) {
                audio.pause();
                button.setText('Play music');
            } else {
                audio.play();
                button.setText('Pause music');
            }
    },

    onShowAbout: function() {
        if (this.getPanelAbout().getHidden()==true) {
            this.getPanelAbout().show();
        } else {
            this.getPanelAbout().hide();
        }
    },

    onShowTags: function() {
        if (this.getPanelImageTags().getHidden()==true) {
            this.getPanelImageTags().show();
            this.getPanelMusicTags().show();
            this.getBtnShowTags().setText('Hide tags');
        } else {
            this.getPanelImageTags().hide();
            this.getPanelMusicTags().hide();
            this.getBtnShowTags().setText('Show tags');
        }

    }


    //called when the Application is launched, remove if not needed
    /*launch: function(app) {
        
    }*/
});
