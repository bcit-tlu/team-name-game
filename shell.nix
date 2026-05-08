{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_22
    docker-compose
  ];

  shellHook = ''
    echo "team-name-game dev shell"
    echo "node $(node --version)"
    echo "npm $(npm --version)"
  '';
}
