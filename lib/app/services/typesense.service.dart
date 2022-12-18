import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:lookout/app/model/search/search_response.model.dart';
import 'package:typesense/typesense.dart';

class TypesenseService {
  static Client clientInstance = Client(Configuration(
      dotenv.maybeGet('TYPESENSE_API_KEY')!,
      nodes: {
        Node(Protocol.https, dotenv.maybeGet('TYPESENSE_URL')!, port: 443)
      },
      connectionTimeout: const Duration(seconds: 2)));
  final Client client;
  TypesenseService({required this.client});

  Future<SearchResponseModel> searchImage(
      Map<String, dynamic> searchParameters) async {
    final res = await client
        .collection('images')
        .documents
        .search(searchParameters)
        .onError((error, stackTrace) => throw 'Search Error');
    debugPrint(jsonEncode(res));
    return SearchResponseModel.fromJson(res);
  }
}
