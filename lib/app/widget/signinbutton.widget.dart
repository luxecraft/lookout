import 'package:flutter/material.dart';

class SignInButton extends StatelessWidget {
  final String assetPath;
  final VoidCallback onPressed;
  final String label;
  final Color backgroundColor;
  final Color foregroundColor;
  final bool applyForLogo;

  const SignInButton({
    super.key,
    required this.assetPath,
    required this.label,
    required this.onPressed,
    this.applyForLogo = false,
    this.backgroundColor = Colors.white,
    this.foregroundColor = Colors.black,
  });

  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      color: backgroundColor,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
      onPressed: onPressed,
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Row(
          children: [
            Image.asset(assetPath,
                height: 24.0,
                width: 24.0,
                color: applyForLogo ? foregroundColor : null),
            const SizedBox(width: 20.0),
            Expanded(
                child: Text(label,
                    style: Theme.of(context)
                        .textTheme
                        .subtitle1
                        ?.apply(color: foregroundColor, fontWeightDelta: 2))),
          ],
        ),
      ),
    );
  }
}
