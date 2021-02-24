{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.yarn
      
    # keep this line if you use bash
    pkgs.bashInteractive
  ];
}
