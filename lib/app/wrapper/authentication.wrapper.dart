import 'dart:async';

import 'package:flutter/material.dart';
import 'package:lookout/main.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class AuthenticationWrapper extends StatefulWidget {
  const AuthenticationWrapper({super.key});

  @override
  State<AuthenticationWrapper> createState() => _AuthenticationWrapperState();
}

class _AuthenticationWrapperState extends State<AuthenticationWrapper> {
  StreamSubscription<AuthState>? _authenticationSubscription;

  @override
  void initState() {
    super.initState();
    _authWrapper();
    _authenticationSubscription ??=
        supabase.auth.onAuthStateChange.listen(_authChange);
  }

  void _authWrapper() async {
    await Future.delayed(Duration.zero);
    if (!mounted) {
      return;
    }
    final session = supabase.auth.currentSession;
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
        navigationKey.currentState!
            .pushNamedAndRemoveUntil('/home', (route) => false);
        break;
      case AuthChangeEvent.signedOut:
        navigationKey.currentState!
            .pushNamedAndRemoveUntil('/login', (route) => false);
        break;
      case AuthChangeEvent.userDeleted:
        navigationKey.currentState!
            .pushNamedAndRemoveUntil('/login', (route) => false);
        break;
      default:
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
