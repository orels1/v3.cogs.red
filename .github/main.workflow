workflow "Develop Deploy" {
  on = "push"
  resolves = ["Ilshidur/actions/discord@master"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch develop"
}

action "now" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Filters for GitHub Actions"]
  args = "-b BUILD_MODE=stage"
  secrets = ["ZEIT_TOKEN"]
}

action "Ilshidur/actions/discord@master" {
  uses = "Ilshidur/actions/discord@master"
  needs = ["now"]
}
