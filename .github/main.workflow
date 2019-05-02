workflow "Develop Deploy" {
  on = "push"
  resolves = ["ping discord"]
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

action "ping discord" {
  uses = "swinton/httpie.action@8ab0a0e926d091e0444fcacd5eb679d2e2d4ab3d"
  needs = ["now"]
  secrets = ["WEBHOOK_URL"]
  args = "POST \"$WEBHOOK_URL\" embeds:='[{\"title\": \"panel.cogs.red [stage] deployed!\", \"description\": \"Check it out at [panelcogsred.orels1.now.sh](https://panelcogsred.orels1.now.sh)\", \"color\":2467932}]'"
}
