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
                              const Text('👀', style: TextStyle(fontSize: 80)),
                              Text('Lookout',
                                  style: Theme.of(context)
                                      .textTheme
                                      .headlineLarge),
                              const Text('A new way to look at images'),
                              const SizedBox(height: 40),
                              RichText(
                                  text: TextSpan(children: const [
                                TextSpan(
                                    text:
                                        '> Search through images using keywords or tags or vibes that you need.\n\n'),
                                TextSpan(
                                    text:
                                        '> You can also search for textual data that can be found inside the images.\n\n'),
                                TextSpan(
                                    text:
                                        '> We have populated hudreds of thousands of images for you to explore.\n\n'),
                                TextSpan(
                                    text:
                                        '> The most exciting part is that you can upload your own images and have them processed to brand it with tags and keywords!.\n'),
                              ], style: Theme.of(context).textTheme.caption)),
                              const SizedBox(height: 40),
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
