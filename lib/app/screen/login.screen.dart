import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lookout/app/constants.dart';
import 'package:lookout/app/globalproviders.dart';
import 'package:lookout/app/widget/signin_button.widget.dart';
import 'package:supabase_flutter/supabase_flutter.dart' as supabase;

class LoginScreen extends ConsumerWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
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
                child: Center(
                    child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                            mainAxisSize: MainAxisSize.min,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              SignInButton(
                                  assetPath: ImageAssets.googleLogo,
                                  label: 'Sign In with Google',
                                  onPressed: () => _signInWithGoogle(ref)),
                              const SizedBox(height: 16),
                              SignInButton(
                                  assetPath: ImageAssets.githubLogo,
                                  label: 'Sign In with Github',
                                  onPressed: () => _signInWithGithub(ref),
                                  applyForLogo: true,
                                  backgroundColor: Colors.black,
                                  foregroundColor: Colors.white),
                            ]))))));
  }

  Future<void> _signInWithGoogle(WidgetRef ref) async {
    await ref.read(supabaseClientProvider).auth.signInWithOAuth(
        supabase.Provider.google,
        redirectTo: 'org.luxecraft.lookout://login-callback/');
  }

  Future<void> _signInWithGithub(WidgetRef ref) async {
    await ref.read(supabaseClientProvider).auth.signInWithOAuth(
        supabase.Provider.github,
        redirectTo: 'org.luxecraft.lookout://login-callback/');
  }
}
