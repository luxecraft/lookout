import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:lookout/app/screen/home.screen.dart';
import 'package:lookout/app/screen/login.screen.dart';
import 'package:lookout/app/wrapper/authentication.wrapper.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

final supabase = Supabase.instance.client;
final navigationKey = GlobalKey<NavigatorState>();

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load();
  await Supabase.initialize(
    url: dotenv.maybeGet('SUPABASE_URL')!,
    anonKey: dotenv.maybeGet('SUPABASE_ANON_KEY')!,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      navigatorKey: navigationKey,
      initialRoute: '/',
      routes: {
        '/': (_) => const AuthenticationWrapper(),
        '/login': (_) => const LoginScreen(),
        '/home': (_) => const HomeScreen(),
      },
    );
  }
}
