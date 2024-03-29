import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lookout/app/globalproviders.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class AuthenticationWrapper extends ConsumerStatefulWidget {
  const AuthenticationWrapper({super.key});

  @override
  ConsumerState<AuthenticationWrapper> createState() =>
      _AuthenticationWrapperState();
}

class _AuthenticationWrapperState extends ConsumerState<AuthenticationWrapper> {
  StreamSubscription<AuthState>? _authenticationSubscription;

  @override
  void initState() {
    super.initState();
    _authWrapper();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _authenticationSubscription ??= ref
        .read(supabaseClientProvider)
        .auth
        .onAuthStateChange
        .listen(_authChange);
  }

  void _authWrapper() async {
    await Future.delayed(const Duration(seconds: 2));
    if (!mounted) {
      return;
    }
    final session = ref.read(supabaseClientProvider).auth.currentSession;
    if (session == null) {
      Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);
    } else {
      Navigator.pushNamedAndRemoveUntil(context, '/home', (route) => false);
    }
  }

  void _authChange(AuthState authState) {
    final event = authState.event;
    switch (event) {
      case AuthChangeEvent.signedIn:
        navigationKeyProvider.currentState!
            .pushNamedAndRemoveUntil('/home', (route) => false);
        break;
      case AuthChangeEvent.signedOut:
        navigationKeyProvider.currentState!
            .pushNamedAndRemoveUntil('/login', (route) => false);
        break;
      case AuthChangeEvent.userDeleted:
        navigationKeyProvider.currentState!
            .pushNamedAndRemoveUntil('/login', (route) => false);
        break;
      default:
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Scaffold(
            body: AnnotatedRegion<SystemUiOverlayStyle>(
                value: SystemUiOverlayStyle.light,
                child: Container(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                        colors: [Colors.black, Color.fromRGBO(18, 50, 39, 1.0)],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter),
                  ),
                  height: MediaQuery.of(context).size.height,
                  width: MediaQuery.of(context).size.width,
                  child: const Center(
                    child: Text(
                      '👀',
                      style: TextStyle(fontSize: 80),
                    ),
                  ),
                ))));
  }
}
