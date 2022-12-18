// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'search_response.model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_SearchResponseModel _$$_SearchResponseModelFromJson(
        Map<String, dynamic> json) =>
    _$_SearchResponseModel(
      facetCounts: json['facet_counts'] as List<dynamic>,
      found: json['found'] as int,
      hits: (json['hits'] as List<dynamic>)
          .map((e) => ImageDocumentHelper.fromJson(e as Map<String, dynamic>))
          .toList(),
      outOf: json['out_of'] as int,
      page: json['page'] as int,
    );

Map<String, dynamic> _$$_SearchResponseModelToJson(
        _$_SearchResponseModel instance) =>
    <String, dynamic>{
      'facet_counts': instance.facetCounts,
      'found': instance.found,
      'hits': instance.hits,
      'out_of': instance.outOf,
      'page': instance.page,
    };

_$_ImageDocumentHelper _$$_ImageDocumentHelperFromJson(
        Map<String, dynamic> json) =>
    _$_ImageDocumentHelper(
      document:
          ImageDocument.fromJson(json['document'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$$_ImageDocumentHelperToJson(
        _$_ImageDocumentHelper instance) =>
    <String, dynamic>{
      'document': instance.document,
    };
