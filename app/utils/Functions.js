Ext.define('mvkapp.utils.Functions', {
	singleton: true,

	requires: [
		'Ext.data.JsonP',
        'Ext.Audio'
	],

	FLICKR_API_KEY: 'cb919bcbfadee449b96f0808ccfe426a',
	SOUNDCLOUD_API_KEY: 'ae5055628a8422288ea6967b72f39861',


	loadFlickrInterestingImages: function(pnlimage_id,pnlError,pnldbgflickr) {
		console.log("loadFlickrInterestingImages called");
        console.log("https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key="+mvkapp.utils.Functions.FLICKR_API_KEY+"&format=json&per_page=1&nojsoncallback=1")
//        console.log("https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key="+mvkapp.utils.Functions.FLICKR_API_KEY+"&format=json&per_page=1&nojsoncallback=1")

        Ext.data.JsonP.request({
            callbackKey: 'jsoncallback',
            url: 'https://api.flickr.com/services/rest/',

            params: {
                method: 'flickr.interestingness.getList',
                //method: 'flickr.photos.getRecent',
                api_key: mvkapp.utils.Functions.FLICKR_API_KEY,
                format: 'json',
                per_page: '1',
                nojsoncallback: '1'
            },
            
            callback: function(success,result) {

                var cosa = result;

                var contenido=pnldbgflickr.getHtml()+"<br>loadFlickImages result:<br>"+JSON.stringify(result)+"<br>";
                pnldbgflickr.setHtml(contenido);

                if (cosa.photos && cosa.photos.photo) {
                    if (cosa.photos["total"]==0) {
                        pnlError.setHtml("No results, try using other tags")
                    } else {
                        time = new Date().getTime();
                        pnlimage_id.setHtml(cosa.photos.photo[0]["id"]);                        
                        pnlimage_id.setData(time);
                    }
                } else {
                     pnlError.setHtml('Something went wrong loading Flickr photos');                                           
                }
            }
        });
	},

    loadFlickrImages: function(pnlimage_id,tags,pnlError,pnldbgflickr) {
        console.log("loadFlickrImages called");
        console.log("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+mvkapp.utils.Functions.FLICKR_API_KEY+"&tags="+tags+"&format=json&per_page=1&nojsoncallback=1")

        Ext.data.JsonP.request({
            callbackKey: 'jsoncallback',
            url: 'https://api.flickr.com/services/rest/',

            params: {
                method: 'flickr.photos.search',
                api_key: mvkapp.utils.Functions.FLICKR_API_KEY,
                tags: tags,
                format: 'json',
                per_page: '1',
                nojsoncallback: '1'
            },
            
            callback: function(success,result) {

                var cosa = result;

                var contenido=pnldbgflickr.getHtml()+tags+"<br>loadFlickImages result:<br>"+JSON.stringify(result)+"<br>";
                pnldbgflickr.setHtml(contenido);
                
                if (cosa.photos && cosa.photos.photo) {
                    if (cosa.photos["total"]==0) {
                        pnlError.setHtml("No results, try using other keywords")
                    } else {
                        time = new Date().getTime();
                        pnlimage_id.setHtml(cosa.photos.photo[0]["id"]);                        
                        pnlimage_id.setData(time);
                    }
                } else {
                     pnlError.setHtml('Something went wrong loading Flickr photos');                                           
                }
            }
        });
    },

    loadFlickrURL: function(picture_id,pnlimage,pnlError,pnldbgflickr) {
        console.log("loadFlickrURL called");
        console.log("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+mvkapp.utils.Functions.FLICKR_API_KEY+"&photo_id="+picture_id+"&format=json&per_page=1&nojsoncallback=1")


        Ext.data.JsonP.request({
            callbackKey: 'jsoncallback',
            url: 'https://api.flickr.com/services/rest/',

            params: {
                method: 'flickr.photos.getSizes',
                photo_id: picture_id,
                api_key: mvkapp.utils.Functions.FLICKR_API_KEY,
                format: 'json',
                nojsoncallback: '1'
            },
            
            callback: function(success,result) {

                var cosa = result.sizes.size;

                if (cosa) {
                    if (cosa[7]) {
                        pnlimage.setStyle({
                                backgroundImage: 'url(\"'+cosa[7]["source"]+'\")'
                            });
                    } else {
                        pnlimage.setStyle({
                                backgroundImage: 'url(\"'+cosa[5]["source"]+'\")'
                            });                        
                    }

                    var contenido=pnldbgflickr.getHtml()+"<br>loadFlickrURL result:<br>"+JSON.stringify(cosa)+"<br>";
                    pnldbgflickr.setHtml(contenido);
                } else {
                    pnlError.setHtml("something went wrong getting image url");
                }
            }
        });
    },

    loadFlickrTags: function(picture_id,pnlimageinfo,pnlimagetags,pnlError,pnldbgflickr) {
        console.log("loadFlickrTags called");
        console.log("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key="+mvkapp.utils.Functions.FLICKR_API_KEY+"&photo_id="+picture_id+"&format=json&per_page=1&nojsoncallback=1")

        var tags = new Array();

        Ext.data.JsonP.request({
            callbackKey: 'jsoncallback',
            url: 'https://api.flickr.com/services/rest/',

            params: {
                method: 'flickr.photos.getInfo',
                photo_id: picture_id,
                api_key: mvkapp.utils.Functions.FLICKR_API_KEY,
                format: 'json',
                nojsoncallback: '1'
            },
            
            callback: function(success,result) {

                var owner = result.photo.owner["username"];
                var title = result.photo.title["_content"];

                if (title.length == 0) title = "Untitled";

                var tags = result.photo.tags.tag;

                if (tags) {
                    var contenido=pnldbgflickr.getHtml()+"<br>loadFlickrTags result:<br>"+JSON.stringify(tags)+"<br>";
                    pnldbgflickr.setHtml(contenido);

                    contenido = "<b>Photo info: </b>";
                    contenido += "\"" + title + "\" by: " + owner;

                    var contenido_tags = "";

                    for (var tag in tags) {
                        if (tags[tag]["machine_tag"]===0) {
                            contenido_tags+=tags[tag]["_content"]+", ";
                        }
                    }
                    if (contenido_tags.length>2) {
                        contenido_tags=contenido_tags.substring(0,contenido_tags.length-2)
                    }

                    pnlimageinfo.setHtml(contenido);
                    pnlimagetags.setHtml(contenido_tags);
                    time = new Date().getTime();
                    pnlimageinfo.setData(time);
                } else {
                    pnlError.setHtml("something went wrong getting image info");
                }
            }
        });
    },

	loadSoundcloudTracks: function(tags,pnlmusicinfo,pnlmusictags,pnlmusicplayer,pnlError,pnldbgsoundcloud) {
		console.log("loadSoundcloudTracks called");
        console.log("https://api.soundcloud.com/tracks.json?client_id="+mvkapp.utils.Functions.SOUNDCLOUD_API_KEY+"&tags="+tags+"&filter=streamable")

        if (tags) {
            Ext.data.JsonP.request({
                callbackKey: 'callback',
                url: 'https://api.soundcloud.com/tracks.json',

                params: {
                    client_id: mvkapp.utils.Functions.SOUNDCLOUD_API_KEY,
                    //q: soundcloud_title.getHtml(),
                    tags: tags,
                    filter: 'streamable',
                    types: 'original,remix,live,recording'
                    //limit: '1'
                },
                
                callback: function(success,result) {
                    var cosa = result;
                    //TODO: filters don't work ok in soundcloud API
                    //      manually search for a track with the correct values (streamable, type)
                    //TODO: sometimes soundcloud returns a blank page in the stream_url. Check it before
                    //      assigning the url to the player
                    //TODO: when there are no results for those tags, it returns a 503 error. 
                    //      Give the correct message and not the "something went wrong" thing
                    if (cosa) {
                        var contenido=JSON.stringify(cosa)+"<br>";
                        pnldbgsoundcloud.setHtml (contenido);
                        title = cosa[0]["title"];
                        author = cosa[0]["user"].username;
                        url = cosa[0]["stream_url"] + "?client_id="+mvkapp.utils.Functions.SOUNDCLOUD_API_KEY;
                        tags = cosa[0]["tag_list"];
                        contenido = "<b>Music info: </b>"
                        contenido += "\"" + title + "\" by: " + author;
                        //contenido += "<br>Tags: " + tags;
                        pnlmusicinfo.setHtml(contenido);
                        pnlmusictags.setHtml(tags);
                        pnlmusicplayer.setUrl(cosa[0]["stream_url"]+"?client_id="+mvkapp.utils.Functions.SOUNDCLOUD_API_KEY);
                        time = new Date().getTime();
                        pnlmusicplayer.setData(time);
                    } else {
                        pnlError.setHtml('Something went wrong loading music, please try again later or with other keywords');                                           
                    }
                }
            });
        } else {
            pnlError.setHtml('Cannot load related music as this photo has no tags');                                           
        }
	}
});