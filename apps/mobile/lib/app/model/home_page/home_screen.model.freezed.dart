// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'home_screen.model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

HomeScreenModel _$HomeScreenModelFromJson(Map<String, dynamic> json) {
  return _HomeScreenModel.fromJson(json);
}

/// @nodoc
mixin _$HomeScreenModel {
  String get query => throw _privateConstructorUsedError;
  int get currentPage => throw _privateConstructorUsedError;
  int get totalFound => throw _privateConstructorUsedError;
  bool get loading => throw _privateConstructorUsedError;
  List<ImageDocumentHelper> get images => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $HomeScreenModelCopyWith<HomeScreenModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $HomeScreenModelCopyWith<$Res> {
  factory $HomeScreenModelCopyWith(
          HomeScreenModel value, $Res Function(HomeScreenModel) then) =
      _$HomeScreenModelCopyWithImpl<$Res, HomeScreenModel>;
  @useResult
  $Res call(
      {String query,
      int currentPage,
      int totalFound,
      bool loading,
      List<ImageDocumentHelper> images});
}

/// @nodoc
class _$HomeScreenModelCopyWithImpl<$Res, $Val extends HomeScreenModel>
    implements $HomeScreenModelCopyWith<$Res> {
  _$HomeScreenModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? query = null,
    Object? currentPage = null,
    Object? totalFound = null,
    Object? loading = null,
    Object? images = null,
  }) {
    return _then(_value.copyWith(
      query: null == query
          ? _value.query
          : query // ignore: cast_nullable_to_non_nullable
              as String,
      currentPage: null == currentPage
          ? _value.currentPage
          : currentPage // ignore: cast_nullable_to_non_nullable
              as int,
      totalFound: null == totalFound
          ? _value.totalFound
          : totalFound // ignore: cast_nullable_to_non_nullable
              as int,
      loading: null == loading
          ? _value.loading
          : loading // ignore: cast_nullable_to_non_nullable
              as bool,
      images: null == images
          ? _value.images
          : images // ignore: cast_nullable_to_non_nullable
              as List<ImageDocumentHelper>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_HomeScreenModelCopyWith<$Res>
    implements $HomeScreenModelCopyWith<$Res> {
  factory _$$_HomeScreenModelCopyWith(
          _$_HomeScreenModel value, $Res Function(_$_HomeScreenModel) then) =
      __$$_HomeScreenModelCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String query,
      int currentPage,
      int totalFound,
      bool loading,
      List<ImageDocumentHelper> images});
}

/// @nodoc
class __$$_HomeScreenModelCopyWithImpl<$Res>
    extends _$HomeScreenModelCopyWithImpl<$Res, _$_HomeScreenModel>
    implements _$$_HomeScreenModelCopyWith<$Res> {
  __$$_HomeScreenModelCopyWithImpl(
      _$_HomeScreenModel _value, $Res Function(_$_HomeScreenModel) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? query = null,
    Object? currentPage = null,
    Object? totalFound = null,
    Object? loading = null,
    Object? images = null,
  }) {
    return _then(_$_HomeScreenModel(
      query: null == query
          ? _value.query
          : query // ignore: cast_nullable_to_non_nullable
              as String,
      currentPage: null == currentPage
          ? _value.currentPage
          : currentPage // ignore: cast_nullable_to_non_nullable
              as int,
      totalFound: null == totalFound
          ? _value.totalFound
          : totalFound // ignore: cast_nullable_to_non_nullable
              as int,
      loading: null == loading
          ? _value.loading
          : loading // ignore: cast_nullable_to_non_nullable
              as bool,
      images: null == images
          ? _value._images
          : images // ignore: cast_nullable_to_non_nullable
              as List<ImageDocumentHelper>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_HomeScreenModel extends _HomeScreenModel {
  _$_HomeScreenModel(
      {required this.query,
      required this.currentPage,
      required this.totalFound,
      required this.loading,
      required final List<ImageDocumentHelper> images})
      : _images = images,
        super._();

  factory _$_HomeScreenModel.fromJson(Map<String, dynamic> json) =>
      _$$_HomeScreenModelFromJson(json);

  @override
  final String query;
  @override
  final int currentPage;
  @override
  final int totalFound;
  @override
  final bool loading;
  final List<ImageDocumentHelper> _images;
  @override
  List<ImageDocumentHelper> get images {
    if (_images is EqualUnmodifiableListView) return _images;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_images);
  }

  @override
  String toString() {
    return 'HomeScreenModel(query: $query, currentPage: $currentPage, totalFound: $totalFound, loading: $loading, images: $images)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_HomeScreenModel &&
            (identical(other.query, query) || other.query == query) &&
            (identical(other.currentPage, currentPage) ||
                other.currentPage == currentPage) &&
            (identical(other.totalFound, totalFound) ||
                other.totalFound == totalFound) &&
            (identical(other.loading, loading) || other.loading == loading) &&
            const DeepCollectionEquality().equals(other._images, _images));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, query, currentPage, totalFound,
      loading, const DeepCollectionEquality().hash(_images));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_HomeScreenModelCopyWith<_$_HomeScreenModel> get copyWith =>
      __$$_HomeScreenModelCopyWithImpl<_$_HomeScreenModel>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_HomeScreenModelToJson(
      this,
    );
  }
}

abstract class _HomeScreenModel extends HomeScreenModel {
  factory _HomeScreenModel(
      {required final String query,
      required final int currentPage,
      required final int totalFound,
      required final bool loading,
      required final List<ImageDocumentHelper> images}) = _$_HomeScreenModel;
  _HomeScreenModel._() : super._();

  factory _HomeScreenModel.fromJson(Map<String, dynamic> json) =
      _$_HomeScreenModel.fromJson;

  @override
  String get query;
  @override
  int get currentPage;
  @override
  int get totalFound;
  @override
  bool get loading;
  @override
  List<ImageDocumentHelper> get images;
  @override
  @JsonKey(ignore: true)
  _$$_HomeScreenModelCopyWith<_$_HomeScreenModel> get copyWith =>
      throw _privateConstructorUsedError;
}
