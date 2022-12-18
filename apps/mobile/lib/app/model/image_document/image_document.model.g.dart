// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'image_document.model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_ImageDocument _$$_ImageDocumentFromJson(Map<String, dynamic> json) =>
    _$_ImageDocument(
      colors:
          (json['colors'] as List<dynamic>).map((e) => e as String).toList(),
      height: json['height'] as int,
      id: json['id'] as String,
      imageUrl: json['image_url'] as String,
      labels:
          (json['labels'] as List<dynamic>).map((e) => e as String).toList(),
      nfsw: json['nfsw'] as bool,
      postUrl: json['post_url'] as String,
      safeSearch: json['safeSearch'] as List<dynamic>,
      source: json['source'] as String,
      sub: json['sub'] as String,
      text: json['text'] as List<dynamic>,
      title: json['title'] as String,
      width: json['width'] as int,
    );

Map<String, dynamic> _$$_ImageDocumentToJson(_$_ImageDocument instance) =>
    <String, dynamic>{
      'colors': instance.colors,
      'height': instance.height,
      'id': instance.id,
      'image_url': instance.imageUrl,
      'labels': instance.labels,
      'nfsw': instance.nfsw,
      'post_url': instance.postUrl,
      'safeSearch': instance.safeSearch,
      'source': instance.source,
      'sub': instance.sub,
      'text': instance.text,
      'title': instance.title,
      'width': instance.width,
    };
