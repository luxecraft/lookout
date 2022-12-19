// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'home_screen.model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_HomeScreenModel _$$_HomeScreenModelFromJson(Map<String, dynamic> json) =>
    _$_HomeScreenModel(
      query: json['query'] as String,
      currentPage: json['currentPage'] as int,
      totalFound: json['totalFound'] as int,
      loading: json['loading'] as bool,
      images: (json['images'] as List<dynamic>)
          .map((e) => ImageDocumentHelper.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$$_HomeScreenModelToJson(_$_HomeScreenModel instance) =>
    <String, dynamic>{
      'query': instance.query,
      'currentPage': instance.currentPage,
      'totalFound': instance.totalFound,
      'loading': instance.loading,
      'images': instance.images,
    };
