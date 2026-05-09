{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_22
  ];

  shellHook = ''
    echo "node $(node --version)"
    echo "npm $(npm --version)"
  '';
}
