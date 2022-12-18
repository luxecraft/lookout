import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lookout/app/services/typesense.service.dart';
import 'package:supabase_flutter/supabase_flutter.dart' as supabase;
import 'package:typesense/typesense.dart';

final navigationKeyProvider = GlobalKey<NavigatorState>();

final supabaseClientProvider =
    Provider((_) => supabase.Supabase.instance.client);

final typesenseServiceProvider = Provider((_) => TypesenseService(
    client: Client(Configuration(dotenv.maybeGet('TYPESENSE_API_KEY')!,
        nodes: {
          Node(Protocol.https, dotenv.maybeGet('TYPESENSE_URL')!, port: 443)
        },
        connectionTimeout: const Duration(seconds: 2)))));
