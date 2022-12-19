import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
              colors: [Colors.black, Color.fromRGBO(18, 50, 39, 1.0)],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter),
        ),
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        child: Scaffold(
            backgroundColor: Colors.transparent,
            appBar: AppBar(
              backgroundColor: Colors.transparent,
              title: const Text('Profile'),
            ),
            body: const Center(child: Text('🚧🚧🚧 Profile Screen 🚧🚧🚧'))));
  }
}
