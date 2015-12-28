﻿#target photoshop/*    Export all localised images in your .psd in one click    Developed by Benoit Freslon - http://www.benoitfreslon.com */function main(){    app.preferences.rulerUnits = Units.PIXELS ;     app.preferences.typeUnits = TypeUnits.PIXELS ;       var doc = activeDocument;    //$.writeln ("activeDocument: "+activeDocument.name);      exportImages(doc);    function exportImages(el)     {                var w = new Window("dialog","Export format");        w.alignChildren = "left";        var radio1 = w.add ("radiobutton", undefined, "JPG Format");        var radio2 = w.add ("radiobutton", undefined, "PNG Format");        radio1.value = true;        w.add ("button", undefined, "OK");        w.show();                var jpg = radio1.value;                var quality = 80;        if (jpg) {            var w = new Window ("dialog"," JPG Quality");            var e = w.add ("edittext", undefined, 80);            var slider = w.add ("slider", undefined, 80, 0, 100);            slider.onChanging = function () {e.text = slider.value;quality = slider.value;}            w.add ("button", undefined, "ok");            w.show ();        }        // Folder        var LanguageLayer;        var arrLanguages = Array();        var arrLayers = Array();                               for(var a=0;a<el.layerSets.length;a++)        {            var groupScreen = el.layerSets[a] ;            groupname = groupScreen.name; //check name for every layer            //$.writeln (groupname);             // Subfolders txt            for(var b=0;b< groupScreen.layerSets.length;b++) //layersets are groups            {                var txtgroup = groupScreen.layerSets[b] ;                var txtname = txtgroup.name;                if (txtname == "txt") {                    // Layer language                    for(var c=0;c<txtgroup.artLayers.length;c++) //check all layers in the txt file                    {                        LanguageLayer = txtgroup.artLayers[c] ;                        LanguageLayer.visible = false;                        //$.writeln (groupname+" "+txtgroup+" "+txtname+" "+LanguageLayer.name+" "+arrLanguages.length);                        if (txtgroup.artLayers.length > arrLanguages.length) {                            arrLanguages.push(LanguageLayer.name);                        }                        //$.writeln (LanguageLayer);                        arrLayers.push(LanguageLayer);                    }                }             }         }             for(var i=0; i<arrLanguages.length; i++)        {            //$.writeln (i+" "+arrLanguages[i]+" "+arrLayers.length);              var curLanguage = arrLanguages[i];                        for(var y=0;y<arrLayers.length;y++)            {                //$.writeln (y+" "+arrLayers[y]+" "+arrLayers.length);                 if (arrLayers[y].name == curLanguage) {                    arrLayers[y].visible = true;                } else {                    arrLayers[y].visible = false;                }            }                    var oldPath = activeDocument.path;            var name = activeDocument.name.substring(0, activeDocument.name.indexOf('.'))            var filename = oldPath+"/"+name+"_"+curLanguage;                        //$.writeln (filename);              if (jpg) {                SaveForWeb(filename, 80);            } else {                SavePNG (filename);            }                                                //SavePNG (filename);        }        alert("Ads created!");    }    function SaveForWeb(saveFile, jpegQuality) {        var sfwOptions = new ExportOptionsSaveForWeb();        sfwOptions.format = SaveDocumentType.JPEG;        sfwOptions.includeProfile = false;        sfwOptions.interlaced = 0;        sfwOptions.optimized = true;        sfwOptions.quality = jpegQuality; //0-100        //$.writeln (saveFile+" "+ExportType.SAVEFORWEB+" "+sfwOptions);        activeDocument.exportDocument(new File(saveFile+".jpg"), ExportType.SAVEFORWEB, sfwOptions);    }    function SavePNG(saveFile){        var pngOpts = new ExportOptionsSaveForWeb;         pngOpts.format = SaveDocumentType.PNG        pngOpts.PNG8 = false;         pngOpts.transparency = true;         pngOpts.interlaced = false;         pngOpts.quality = 100;        activeDocument.exportDocument(new File(saveFile+".png"),ExportType.SAVEFORWEB,pngOpts);     }};main();