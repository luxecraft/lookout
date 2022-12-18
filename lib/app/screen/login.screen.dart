import 'package:flutter/material.dart';
import 'package:lookout/app/constants.dart';
import 'package:lookout/app/widget/signinbutton.widget.dart';
import 'package:lookout/main.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SignInButton(
                  assetPath: ImageAssets.googleLogo,
                  label: 'Sign In with Google',
                  onPressed: _signInWithGoogle),
              const SizedBox(height: 16),
              SignInButton(
                  assetPath: ImageAssets.githubLogo,
                  label: 'Sign In with Github',
                  onPressed: _signInWithGithub,
                  applyForLogo: true,
                  backgroundColor: Colors.black,
                  foregroundColor: Colors.white),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _signInWithGoogle() async {
    await supabase.auth.signInWithOAuth(Provider.google,
        redirectTo: 'org.luxecraft.lookout://login-callback/');
  }

  Future<void> _signInWithGithub() async {
    await supabase.auth.signInWithOAuth(Provider.github,
        redirectTo: 'org.luxecraft.lookout://login-callback/');
  }
}
