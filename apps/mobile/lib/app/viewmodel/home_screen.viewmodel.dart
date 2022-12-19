import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lookout/app/model/home_page/home_screen.model.dart';
import 'package:lookout/app/model/search/search_response.model.dart';
import 'package:lookout/app/services/typesense.service.dart';

class HomeScreenViewModel extends StateNotifier<HomeScreenModel> {
  static const int perPage = 100;
  final TypesenseService typesenseService;
  HomeScreenViewModel({required this.typesenseService})
      : super(HomeScreenModel.initial()) {
    fetchImages();
  }

  Future<void> fetchImages() async {
    await typesenseService.searchImage({
      'q': state.query == '' ? '*' : state.query,
      'query_by': 'labels, text, source',
      'query_by_weights': '2, 1, 1',
      'per_page': '$perPage',
    }).then((value) {
      state = HomeScreenModel(
          currentPage: value.page,
          query: state.query,
          totalFound: value.found,
          images: value.hits,
          loading: false);
    });
  }

  Future<void> paginateFetch() async {
    state = state.copyWith(loading: true);
    await typesenseService.searchImage({
      'q': state.query != '' ? state.query : '*',
      'query_by': 'labels, text, source',
      'query_by_weights': '2, 1, 1',
      'per_page': '$perPage',
      'page': '${state.currentPage + 1}',
    }).then((value) {
      final tempHits = List<ImageDocumentHelper>.from(state.images);
      tempHits.addAll(value.hits);
      state = state.copyWith(
          images: tempHits, currentPage: state.currentPage + 1, loading: false);
    });
  }

  void updateQuery(String query) {
    state = state.copyWith(query: query);
    fetchImages();
  }
}
