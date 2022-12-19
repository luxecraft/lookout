import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:lookout/app/model/home_page/home_screen.model.dart';
import 'package:lookout/app/model/image_document/image_document.model.dart';
import 'package:lookout/app/services/typesense.service.dart';
import 'package:lookout/app/viewmodel/home_screen.viewmodel.dart';

class HomeScreen extends ConsumerWidget {
  late final StateNotifierProvider<HomeScreenViewModel, HomeScreenModel>
      _homeScreenProvider;
  late final TextEditingController _textEditingController;

  HomeScreen({super.key}) {
    _homeScreenProvider = StateNotifierProvider((_) => HomeScreenViewModel(
        HomeScreenModel(images: [], query: ''),
        typesenseService:
            TypesenseService(client: TypesenseService.clientInstance)));
    _textEditingController = TextEditingController();
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
        body: AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle.light,
      child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
                colors: [Colors.black, Color.fromRGBO(18, 50, 39, 1.0)],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter),
          ),
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          child: Stack(children: [
            SingleChildScrollView(
                padding: EdgeInsets.only(
                    left: 16.0,
                    right: 16.0,
                    top: MediaQuery.of(context).padding.top + 16,
                    bottom: MediaQuery.of(context).padding.bottom),
                child: StaggeredGrid.count(
                    mainAxisSpacing: 20,
                    crossAxisSpacing: 20,
                    crossAxisCount: 2,
                    children: ref
                        .watch(_homeScreenProvider)
                        .images
                        .map((e) => ImageView(imageDocument: e.document))
                        .toList())),
            Align(
                alignment: Alignment.bottomCenter,
                child: Padding(
                    padding: const EdgeInsets.only(
                        left: 24.0, right: 24.0, bottom: 40),
                    child: LayoutBuilder(builder: (context, constraints) {
                      return Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          SizedBox(
                            width: constraints.maxWidth - (24 + 50),
                            child: ClipRRect(
                                borderRadius: BorderRadius.circular(9.0),
                                child: BackdropFilter(
                                    filter: ImageFilter.blur(
                                        sigmaX: 10.0, sigmaY: 10.0),
                                    child: Container(
                                        color: Colors.grey.withOpacity(0.2),
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 4.0, vertical: 4.0),
                                        child: TextField(
                                            onChanged: ref
                                                .read(_homeScreenProvider
                                                    .notifier)
                                                .updateQuery,
                                            decoration: InputDecoration(
                                                border: InputBorder.none,
                                                prefixIcon: const Icon(
                                                    Icons.search,
                                                    color: Colors.white),
                                                suffixIcon: ref
                                                            .read(
                                                                _homeScreenProvider)
                                                            .query !=
                                                        ''
                                                    ? Padding(
                                                        padding:
                                                            const EdgeInsets
                                                                    .symmetric(
                                                                horizontal:
                                                                    8.0),
                                                        child: GestureDetector(
                                                            child: const Icon(
                                                              Icons.close,
                                                              color:
                                                                  Colors.white,
                                                            ),
                                                            onTap: () {
                                                              ref
                                                                  .read(_homeScreenProvider
                                                                      .notifier)
                                                                  .updateQuery(
                                                                      '');
                                                              _textEditingController
                                                                  .text = '';
                                                            }),
                                                      )
                                                    : null),
                                            style: Theme.of(context)
                                                .textTheme
                                                .titleLarge,
                                            cursorColor: Colors.white)))),
                          ),
                          const SizedBox(width: 24),
                          ClipRRect(
                              borderRadius: BorderRadius.circular(9.0),
                              child: InkWell(
                                onTap: () =>
                                    Navigator.pushNamed(context, '/profile'),
                                child: BackdropFilter(
                                    filter: ImageFilter.blur(
                                        sigmaX: 10.0, sigmaY: 10.0),
                                    child: const Padding(
                                      padding: EdgeInsets.all(5.0),
                                      child: CircleAvatar(
                                        backgroundColor: Colors.transparent,
                                        child: Text('👀',
                                            style: TextStyle(fontSize: 26)),
                                      ),
                                    )),
                              ))
                        ],
                      );
                    })))
          ])),
    ));
  }
}

class ImageView extends StatelessWidget {
  final ImageDocument imageDocument;
  const ImageView({super.key, required this.imageDocument});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () => showDialog(
            context: context,
            builder: (_) => ImageExpandedDialog(imageDocument: imageDocument)),
        child: ClipRRect(
            borderRadius: BorderRadius.circular(15.0),
            child: Hero(
              tag: imageDocument,
              child: Image.network(
                  'https://dpwrbxfwwbhrlknssqsw.supabase.co/storage/v1/object/public/hari-dev/${imageDocument.imageUrl}'),
            )));
  }
}

class ImageExpandedDialog extends StatelessWidget {
  final ImageDocument imageDocument;
  const ImageExpandedDialog({super.key, required this.imageDocument});

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
              child: GestureDetector(
                  onTap: () => Navigator.pop(context),
                  child: const Icon(Icons.close, size: 48)),
            ),
            const SizedBox(height: 30),
            Align(
              alignment: Alignment.center,
              child: Hero(
                  tag: imageDocument,
                  child: Image.network(
                      'https://dpwrbxfwwbhrlknssqsw.supabase.co/storage/v1/object/public/hari-dev/${imageDocument.imageUrl}')),
            ),
            const SizedBox(height: 30),
            Align(
              alignment: Alignment.bottomLeft,
              child: Wrap(
                  children: imageDocument.labels
                      .map((e) => Card(
                          child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text(e,
                                  style: Theme.of(context)
                                      .textTheme
                                      .titleMedium))))
                      .toList()),
            )
          ],
        ),
      ),
    );
  }
}

// SizedBox(
//   width: MediaQuery.of(context).size.width - 48,
//   height: 60,
//   child: Card(
//       child: SingleChildScrollView(
//     scrollDirection: Axis.horizontal,
//     child: Row(
//       children: ref
//           .watch(_homeScreenProvider)
//           .query
//           .map((e) => Card(
//                 child: Text(e),
//               ))
//           .toList(),
//     ),
//   )
//  TextFieldTags(
//     // onChanged:
//     //     ref.read(_homeScreenProvider.notifier).updateQuery)),
//     textSeparators: const [','],
//     textfieldTagsController: _textfieldTagsController,
//     inputfieldBuilder:
//         (context, tec, fn, error, onChanged, onSubmitted) {
//       return ((context, sc, tags, onTagDelete) {
//         return TextField(
//           onChanged: onChanged,
//         );
//       });
//     }),
// ),
