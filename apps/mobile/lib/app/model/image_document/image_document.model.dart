import 'package:freezed_annotation/freezed_annotation.dart';

part 'image_document.model.freezed.dart';
part 'image_document.model.g.dart';

@freezed
class ImageDocument with _$ImageDocument {
  factory ImageDocument({
    required List<String> colors,
    required int height,
    required String id,
    @JsonKey(name: 'image_url') required String imageUrl,
    required List<String> labels,
    required bool nfsw,
    // ignore: invalid_annotation_target
    @JsonKey(name: 'post_url') required String postUrl,
    required List safeSearch,
    required String source,
    required String sub,
    required List text,
    required String title,
    required int width,
  }) = _ImageDocument;

  factory ImageDocument.fromJson(Map<String, dynamic> json) =>
      _$ImageDocumentFromJson(json);
}



// final object = {
//   "colors": ["rgb(120,120,120)", "rgb(151,150,150)", "rgb(90,90,90)"],
//   "height": 390,
//   "id": "3999",
//   "image_url": "/images/images_3/images_39/images_3999.jpeg",
//   "labels": [
//     "Photograph",
//     "White",
//     "Black",
//     "Gesture",
//     "Black-and-white",
//     "Style",
//     "People",
//     "Monochrome",
//     "Monochrome photography",
//     "Snapshot"
//   ],
//   "nfsw": false,
//   "post_url": "https://www.instagram.com/p/CEc2Oo9JJFY/",
//   "safeSearch": [],
//   "source": "instagram",
//   "sub": "/b/58/c7/58c7caa3ed3a072663b5497edf9d7283c304c2ab",
//   "text": [],
//   "title": "@dominicsmith22 on Instagram",
//   "width": 512
// };
