// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'search_response.model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

SearchResponseModel _$SearchResponseModelFromJson(Map<String, dynamic> json) {
  return _SearchResponseModel.fromJson(json);
}

/// @nodoc
mixin _$SearchResponseModel {
  @JsonKey(name: "facet_counts")
  List<dynamic> get facetCounts => throw _privateConstructorUsedError;
  int get found => throw _privateConstructorUsedError;
  List<ImageDocumentHelper> get hits => throw _privateConstructorUsedError;
  @JsonKey(name: "out_of")
  int get outOf => throw _privateConstructorUsedError;
  int get page => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $SearchResponseModelCopyWith<SearchResponseModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SearchResponseModelCopyWith<$Res> {
  factory $SearchResponseModelCopyWith(
          SearchResponseModel value, $Res Function(SearchResponseModel) then) =
      _$SearchResponseModelCopyWithImpl<$Res, SearchResponseModel>;
  @useResult
  $Res call(
      {@JsonKey(name: "facet_counts") List<dynamic> facetCounts,
      int found,
      List<ImageDocumentHelper> hits,
      @JsonKey(name: "out_of") int outOf,
      int page});
}

/// @nodoc
class _$SearchResponseModelCopyWithImpl<$Res, $Val extends SearchResponseModel>
    implements $SearchResponseModelCopyWith<$Res> {
  _$SearchResponseModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? facetCounts = null,
    Object? found = null,
    Object? hits = null,
    Object? outOf = null,
    Object? page = null,
  }) {
    return _then(_value.copyWith(
      facetCounts: null == facetCounts
          ? _value.facetCounts
          : facetCounts // ignore: cast_nullable_to_non_nullable
              as List<dynamic>,
      found: null == found
          ? _value.found
          : found // ignore: cast_nullable_to_non_nullable
              as int,
      hits: null == hits
          ? _value.hits
          : hits // ignore: cast_nullable_to_non_nullable
              as List<ImageDocumentHelper>,
      outOf: null == outOf
          ? _value.outOf
          : outOf // ignore: cast_nullable_to_non_nullable
              as int,
      page: null == page
          ? _value.page
          : page // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_SearchResponseModelCopyWith<$Res>
    implements $SearchResponseModelCopyWith<$Res> {
  factory _$$_SearchResponseModelCopyWith(_$_SearchResponseModel value,
          $Res Function(_$_SearchResponseModel) then) =
      __$$_SearchResponseModelCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {@JsonKey(name: "facet_counts") List<dynamic> facetCounts,
      int found,
      List<ImageDocumentHelper> hits,
      @JsonKey(name: "out_of") int outOf,
      int page});
}

/// @nodoc
class __$$_SearchResponseModelCopyWithImpl<$Res>
    extends _$SearchResponseModelCopyWithImpl<$Res, _$_SearchResponseModel>
    implements _$$_SearchResponseModelCopyWith<$Res> {
  __$$_SearchResponseModelCopyWithImpl(_$_SearchResponseModel _value,
      $Res Function(_$_SearchResponseModel) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? facetCounts = null,
    Object? found = null,
    Object? hits = null,
    Object? outOf = null,
    Object? page = null,
  }) {
    return _then(_$_SearchResponseModel(
      facetCounts: null == facetCounts
          ? _value._facetCounts
          : facetCounts // ignore: cast_nullable_to_non_nullable
              as List<dynamic>,
      found: null == found
          ? _value.found
          : found // ignore: cast_nullable_to_non_nullable
              as int,
      hits: null == hits
          ? _value._hits
          : hits // ignore: cast_nullable_to_non_nullable
              as List<ImageDocumentHelper>,
      outOf: null == outOf
          ? _value.outOf
          : outOf // ignore: cast_nullable_to_non_nullable
              as int,
      page: null == page
          ? _value.page
          : page // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_SearchResponseModel implements _SearchResponseModel {
  _$_SearchResponseModel(
      {@JsonKey(name: "facet_counts") required final List<dynamic> facetCounts,
      required this.found,
      required final List<ImageDocumentHelper> hits,
      @JsonKey(name: "out_of") required this.outOf,
      required this.page})
      : _facetCounts = facetCounts,
        _hits = hits;

  factory _$_SearchResponseModel.fromJson(Map<String, dynamic> json) =>
      _$$_SearchResponseModelFromJson(json);

  final List<dynamic> _facetCounts;
  @override
  @JsonKey(name: "facet_counts")
  List<dynamic> get facetCounts {
    if (_facetCounts is EqualUnmodifiableListView) return _facetCounts;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_facetCounts);
  }

  @override
  final int found;
  final List<ImageDocumentHelper> _hits;
  @override
  List<ImageDocumentHelper> get hits {
    if (_hits is EqualUnmodifiableListView) return _hits;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_hits);
  }

  @override
  @JsonKey(name: "out_of")
  final int outOf;
  @override
  final int page;

  @override
  String toString() {
    return 'SearchResponseModel(facetCounts: $facetCounts, found: $found, hits: $hits, outOf: $outOf, page: $page)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_SearchResponseModel &&
            const DeepCollectionEquality()
                .equals(other._facetCounts, _facetCounts) &&
            (identical(other.found, found) || other.found == found) &&
            const DeepCollectionEquality().equals(other._hits, _hits) &&
            (identical(other.outOf, outOf) || other.outOf == outOf) &&
            (identical(other.page, page) || other.page == page));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(_facetCounts),
      found,
      const DeepCollectionEquality().hash(_hits),
      outOf,
      page);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_SearchResponseModelCopyWith<_$_SearchResponseModel> get copyWith =>
      __$$_SearchResponseModelCopyWithImpl<_$_SearchResponseModel>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_SearchResponseModelToJson(
      this,
    );
  }
}

abstract class _SearchResponseModel implements SearchResponseModel {
  factory _SearchResponseModel(
      {@JsonKey(name: "facet_counts") required final List<dynamic> facetCounts,
      required final int found,
      required final List<ImageDocumentHelper> hits,
      @JsonKey(name: "out_of") required final int outOf,
      required final int page}) = _$_SearchResponseModel;

  factory _SearchResponseModel.fromJson(Map<String, dynamic> json) =
      _$_SearchResponseModel.fromJson;

  @override
  @JsonKey(name: "facet_counts")
  List<dynamic> get facetCounts;
  @override
  int get found;
  @override
  List<ImageDocumentHelper> get hits;
  @override
  @JsonKey(name: "out_of")
  int get outOf;
  @override
  int get page;
  @override
  @JsonKey(ignore: true)
  _$$_SearchResponseModelCopyWith<_$_SearchResponseModel> get copyWith =>
      throw _privateConstructorUsedError;
}

ImageDocumentHelper _$ImageDocumentHelperFromJson(Map<String, dynamic> json) {
  return _ImageDocumentHelper.fromJson(json);
}

/// @nodoc
mixin _$ImageDocumentHelper {
  ImageDocument get document => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ImageDocumentHelperCopyWith<ImageDocumentHelper> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ImageDocumentHelperCopyWith<$Res> {
  factory $ImageDocumentHelperCopyWith(
          ImageDocumentHelper value, $Res Function(ImageDocumentHelper) then) =
      _$ImageDocumentHelperCopyWithImpl<$Res, ImageDocumentHelper>;
  @useResult
  $Res call({ImageDocument document});

  $ImageDocumentCopyWith<$Res> get document;
}

/// @nodoc
class _$ImageDocumentHelperCopyWithImpl<$Res, $Val extends ImageDocumentHelper>
    implements $ImageDocumentHelperCopyWith<$Res> {
  _$ImageDocumentHelperCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? document = null,
  }) {
    return _then(_value.copyWith(
      document: null == document
          ? _value.document
          : document // ignore: cast_nullable_to_non_nullable
              as ImageDocument,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $ImageDocumentCopyWith<$Res> get document {
    return $ImageDocumentCopyWith<$Res>(_value.document, (value) {
      return _then(_value.copyWith(document: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_ImageDocumentHelperCopyWith<$Res>
    implements $ImageDocumentHelperCopyWith<$Res> {
  factory _$$_ImageDocumentHelperCopyWith(_$_ImageDocumentHelper value,
          $Res Function(_$_ImageDocumentHelper) then) =
      __$$_ImageDocumentHelperCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({ImageDocument document});

  @override
  $ImageDocumentCopyWith<$Res> get document;
}

/// @nodoc
class __$$_ImageDocumentHelperCopyWithImpl<$Res>
    extends _$ImageDocumentHelperCopyWithImpl<$Res, _$_ImageDocumentHelper>
    implements _$$_ImageDocumentHelperCopyWith<$Res> {
  __$$_ImageDocumentHelperCopyWithImpl(_$_ImageDocumentHelper _value,
      $Res Function(_$_ImageDocumentHelper) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? document = null,
  }) {
    return _then(_$_ImageDocumentHelper(
      document: null == document
          ? _value.document
          : document // ignore: cast_nullable_to_non_nullable
              as ImageDocument,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_ImageDocumentHelper implements _ImageDocumentHelper {
  _$_ImageDocumentHelper({required this.document});

  factory _$_ImageDocumentHelper.fromJson(Map<String, dynamic> json) =>
      _$$_ImageDocumentHelperFromJson(json);

  @override
  final ImageDocument document;

  @override
  String toString() {
    return 'ImageDocumentHelper(document: $document)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_ImageDocumentHelper &&
            (identical(other.document, document) ||
                other.document == document));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, document);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_ImageDocumentHelperCopyWith<_$_ImageDocumentHelper> get copyWith =>
      __$$_ImageDocumentHelperCopyWithImpl<_$_ImageDocumentHelper>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_ImageDocumentHelperToJson(
      this,
    );
  }
}

abstract class _ImageDocumentHelper implements ImageDocumentHelper {
  factory _ImageDocumentHelper({required final ImageDocument document}) =
      _$_ImageDocumentHelper;

  factory _ImageDocumentHelper.fromJson(Map<String, dynamic> json) =
      _$_ImageDocumentHelper.fromJson;

  @override
  ImageDocument get document;
  @override
  @JsonKey(ignore: true)
  _$$_ImageDocumentHelperCopyWith<_$_ImageDocumentHelper> get copyWith =>
      throw _privateConstructorUsedError;
}
