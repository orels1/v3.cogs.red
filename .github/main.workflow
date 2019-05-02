workflow "Develop Deploy" {
  on = "push"
  resolves = ["appleboy/discord-action@master"]
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

action "appleboy/discord-action@master" {
  uses = "Ilshidur/actions/discord@master"
  needs = ["now"]
  secrets = ["WEBHOOK_TOKEN", "WEBHOOK_ID"]
  args = "v3.cogs.red [stage] has been deployed to [v3cogsred.orels1.now.sh](https://v3cogsred.orels1.now.sh/)"
  env = {
    COLOR = "#25a85c"
  }
}
