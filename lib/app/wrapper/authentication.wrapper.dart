import 'dart:async';

import 'package:flutter/material.dart';
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
    await Future.delayed(Duration.zero);
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
        ref
            .read(navigationKeyProvider)
            .currentState!
            .pushNamedAndRemoveUntil('/home', (route) => false);
        break;
      case AuthChangeEvent.signedOut:
        ref
            .read(navigationKeyProvider)
            .currentState!
            .pushNamedAndRemoveUntil('/login', (route) => false);
        break;
      case AuthChangeEvent.userDeleted:
        ref
            .read(navigationKeyProvider)
            .currentState!
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
