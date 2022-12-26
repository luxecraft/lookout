import 'dart:ui';

import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:lookout/app/model/image_document/image_document.model.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';

class ImageView extends StatelessWidget {
  final ImageDocument imageDocument;
  const ImageView({super.key, required this.imageDocument});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: Dio().get(
            'https://dpwrbxfwwbhrlknssqsw.supabase.co/storage/v1/object/public/hari-dev/${imageDocument.imageUrl}',
            options: Options(responseType: ResponseType.bytes)),
        builder: (context, snapshot) {
          if (snapshot.hasData &&
              snapshot.connectionState == ConnectionState.done) {
            final Uint8List bytes = Uint8List.fromList(snapshot.data!.data);
            return Stack(
              children: [
                GestureDetector(
                    onTap: () => showDialog(
                        context: context,
                        builder: (_) => ImageExpandedDialog(
                            key: key,
                            imageDocument: imageDocument,
                            bytes: bytes)),
                    child: ClipRRect(
                        borderRadius: BorderRadius.circular(15.0),
                        child: Hero(
                          tag: imageDocument,
                          child: Image.memory(bytes),
                        ))),
                Align(
                    alignment: Alignment.topLeft,
                    child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ClipRRect(
                            borderRadius: BorderRadius.circular(5.0),
                            child: BackdropFilter(
                                filter: ImageFilter.blur(
                                    sigmaX: 10.0, sigmaY: 10.0),
                                child: Padding(
                                  padding: const EdgeInsets.all(4.0),
                                  child: Icon(
                                      sourceLogoHelper(imageDocument.source)),
                                ))))),
              ],
            );
          } else {
            return Container();
          }
        });
  }
}

class ImageExpandedDialog extends StatelessWidget {
  final ImageDocument imageDocument;
  final Uint8List bytes;
  const ImageExpandedDialog(
      {super.key, required this.imageDocument, required this.bytes});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Align(
              alignment: Alignment.topRight,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(
                    onTap: () => launchUrl(Uri.parse(imageDocument.postUrl)),
                    child: ClipRRect(
                        borderRadius: BorderRadius.circular(5.0),
                        child: BackdropFilter(
                            filter:
                                ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
                            child: Padding(
                              padding: const EdgeInsets.all(9.0),
                              child: Icon(
                                  sourceLogoHelper(imageDocument.source),
                                  size: 32),
                            ))),
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      GestureDetector(
                          onTap: () => Share.shareXFiles(
                              [XFile.fromData(bytes, mimeType: 'image/jpeg')]),
                          child: const Icon(CupertinoIcons.share, size: 32)),
                      const SizedBox(width: 20),
                      GestureDetector(
                          onTap: () => Navigator.pop(context),
                          child: const Icon(CupertinoIcons.clear, size: 32)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 30),
            Align(
              alignment: Alignment.center,
              child: Hero(tag: imageDocument, child: Image.memory(bytes)),
            ),
            const SizedBox(height: 30),
            Align(
              alignment: Alignment.bottomLeft,
              child: Column(
                children: [
                  Wrap(
                      children: imageDocument.labels
                          .map((e) => Card(
                              child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Text(e,
                                      style: Theme.of(context)
                                          .textTheme
                                          .titleMedium))))
                          .toList()),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

IconData sourceLogoHelper(String source) {
  final temp = source.toLowerCase();
  if (temp.contains('instagram')) {
    return FontAwesomeIcons.instagram;
  } else if (temp.contains('pinterest')) {
    return FontAwesomeIcons.pinterest;
  } else if (temp.contains('reddit')) {
    return FontAwesomeIcons.reddit;
  } else {
    return FontAwesomeIcons.bucket;
  }
}
