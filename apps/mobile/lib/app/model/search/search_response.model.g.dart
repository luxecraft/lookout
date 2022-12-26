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
      requestParams: RequestParams.fromJson(
          json['request_params'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$$_SearchResponseModelToJson(
        _$_SearchResponseModel instance) =>
    <String, dynamic>{
      'facet_counts': instance.facetCounts,
      'found': instance.found,
      'hits': instance.hits,
      'out_of': instance.outOf,
      'page': instance.page,
      'request_params': instance.requestParams,
    };

_$_RepuestParams _$$_RepuestParamsFromJson(Map<String, dynamic> json) =>
    _$_RepuestParams(
      collectioName: json['collection_name'] as String,
      perPage: json['per_page'] as int,
      query: json['q'] as String,
    );

Map<String, dynamic> _$$_RepuestParamsToJson(_$_RepuestParams instance) =>
    <String, dynamic>{
      'collection_name': instance.collectioName,
      'per_page': instance.perPage,
      'q': instance.query,
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
