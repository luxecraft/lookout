import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:lookout/app/model/image_document/image_document.model.dart';

part 'search_response.model.freezed.dart';
part 'search_response.model.g.dart';

@freezed
class SearchResponseModel with _$SearchResponseModel {
  factory SearchResponseModel({
    @JsonKey(name: "facet_counts") required List facetCounts,
    required int found,
    required List<ImageDocumentHelper> hits,
    @JsonKey(name: "out_of") required int outOf,
    required int page,
  }) = _SearchResponseModel;

  factory SearchResponseModel.fromJson(Map<String, dynamic> json) =>
      _$SearchResponseModelFromJson(json);
}

@freezed
class ImageDocumentHelper with _$ImageDocumentHelper {
  factory ImageDocumentHelper({
    required ImageDocument document,
  }) = _ImageDocumentHelper;

  factory ImageDocumentHelper.fromJson(Map<String, dynamic> json) =>
      _$ImageDocumentHelperFromJson(json);
}
