import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lookout/app/services/typesense.service.dart';

void main() async {
  await dotenv.load();
  group('Typesense Service Tests', () {
    test('Typesense image search', () async {
      final typesenseService =
          TypesenseService(client: TypesenseService.clientInstance);
      final response =
          await typesenseService.searchImage({'q': '', 'query_by': 'labels'});
      expect(response.hits.isNotEmpty, true);
    }, timeout: const Timeout(Duration(minutes: 1)));
  });
}

// "request_params":{"collection_name":"images","per_page":10,"q":""},"search_cutoff":false,"search_time_ms":1}