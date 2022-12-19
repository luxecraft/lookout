import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:lookout/app/model/search/search_response.model.dart';

part 'home_screen.model.freezed.dart';
part 'home_screen.model.g.dart';

@freezed
class HomeScreenModel with _$HomeScreenModel {
  HomeScreenModel._();

  factory HomeScreenModel({
    required String query,
    required int currentPage,
    required int totalFound,
    required bool loading,
    required List<ImageDocumentHelper> images,
  }) = _HomeScreenModel;

  factory HomeScreenModel.fromJson(Map<String, dynamic> json) =>
      _$HomeScreenModelFromJson(json);

  factory HomeScreenModel.initial() => HomeScreenModel(
      images: [], query: '', currentPage: 1, totalFound: 30, loading: false);
}
