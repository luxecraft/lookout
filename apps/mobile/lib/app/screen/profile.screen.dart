import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lookout/app/globalproviders.dart';

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
        body: Center(
          child: Column(
            children: [
              const SizedBox(height: 40),
              CircleAvatar(
                foregroundImage: NetworkImage(ref
                    .watch(supabaseClientProvider)
                    .auth
                    .currentUser
                    ?.userMetadata?['avatar_url']),
                radius: 60,
              ),
              const SizedBox(height: 30),
              Text(
                ref
                        .watch(supabaseClientProvider)
                        .auth
                        .currentUser!
                        .userMetadata?['full_name'] ??
                    'No Name',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 10),
              Text(
                ref.watch(supabaseClientProvider).auth.currentUser!.email ?? '',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              // Text(ref.watch(supabaseClientProvider).auth.currentUser)
            ],
          ),
        ),
      ),
    );
  }
}
