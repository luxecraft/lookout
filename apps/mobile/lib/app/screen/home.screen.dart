import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:lazy_load_scrollview/lazy_load_scrollview.dart';
import 'package:lookout/app/model/home_page/home_screen.model.dart';
import 'package:lookout/app/services/typesense.service.dart';
import 'package:lookout/app/viewmodel/home_screen.viewmodel.dart';
import 'package:lookout/app/widget/image_view.widget.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  late final StateNotifierProvider<HomeScreenViewModel, HomeScreenModel>
      _homeScreenProvider;
  late final TextEditingController _textEditingController;

  @override
  void initState() {
    super.initState();
    _homeScreenProvider = StateNotifierProvider((_) => HomeScreenViewModel(
        typesenseService:
            TypesenseService(client: TypesenseService.clientInstance)));
    _textEditingController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
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
                LazyLoadScrollView(
                    // onEndOfPage: () => ref
                    //     .read(_homeScreenProvider.notifier)
                    //     .paginateFetch(),
                    onEndOfPage: () {},
                    child: SingleChildScrollView(
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
                              .map((e) => ImageView(
                                  key: Key(e.document.id),
                                  imageDocument: e.document))
                              .toList()),
                    )),
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
                                                controller:
                                                    _textEditingController,
                                                onSubmitted: ref
                                                    .read(_homeScreenProvider
                                                        .notifier)
                                                    .updateQuery,
                                                // onChanged: ref
                                                //     .read(_homeScreenProvider
                                                //         .notifier)
                                                //     .updateQuery,
                                                decoration: InputDecoration(
                                                    border: InputBorder.none,
                                                    prefixIcon: const Icon(
                                                        Icons.search,
                                                        color: Colors.white),
                                                    suffixIcon: ref
                                                                .watch(
                                                                    _homeScreenProvider)
                                                                .query !=
                                                            ''
                                                        ? Padding(
                                                            padding:
                                                                const EdgeInsets
                                                                        .symmetric(
                                                                    horizontal:
                                                                        8.0),
                                                            child:
                                                                GestureDetector(
                                                                    child:
                                                                        const Icon(
                                                                      Icons
                                                                          .close,
                                                                      color: Colors
                                                                          .white,
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
                                    onTap: () => Navigator.pushNamed(
                                        context, '/profile'),
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
              ]),
            )));
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
