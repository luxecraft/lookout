import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lookout/app/model/home_page/home_screen.model.dart';
import 'package:lookout/app/services/typesense.service.dart';

class HomeScreenViewModel extends StateNotifier<HomeScreenModel> {
  final TypesenseService typesenseService;
  HomeScreenViewModel(super.state, {required this.typesenseService}) {
    fetchImages();
  }

  Future<void> fetchImages() async {
    final response = await typesenseService
        .searchImage({'q': state.query, 'query_by': 'labels'});
    state = state.copyWith(
      images: response.hits,
    );
  }

  void updateQuery(String query) {
    state = state.copyWith(query: query);
    fetchImages();
  }
}
