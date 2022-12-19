import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lookout/app/globalproviders.dart';
import 'package:lookout/app/screen/home.screen.dart';
import 'package:lookout/app/screen/login.screen.dart';
import 'package:lookout/app/screen/profile.screen.dart';
import 'package:lookout/app/wrapper/authentication.wrapper.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load();
  await Supabase.initialize(
      url: dotenv.maybeGet('SUPABASE_URL')!,
      anonKey: dotenv.maybeGet('SUPABASE_ANON_KEY')!);
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      navigatorKey: navigationKeyProvider,
      theme: ThemeData.dark().copyWith(
        appBarTheme: const AppBarTheme(backgroundColor: Colors.transparent),
        textTheme: ThemeData.dark().textTheme.apply(fontFamily: 'Silkscreen'),
      ),
      initialRoute: '/',
      routes: {
        '/': (_) => const AuthenticationWrapper(),
        '/login': (_) => const LoginScreen(),
        '/home': (_) => HomeScreen(),
        '/profile': (_) => const ProfileScreen(),
      },
    );
  }
}
