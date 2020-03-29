use clokwerk::{Scheduler, TimeUnits};
use std::time::Duration;
use chrono::prelude::{Local};
// use reqwest;
use dotenv;

fn main() {
  dotenv::dotenv().ok();

  // let http_client = reqwest::Client::new();
  let mut scheduler = Scheduler::new();

  scheduler.every(10.seconds()).run(|| the_whole_thing());

  // Tick scheduler
  let thread_handle = scheduler.watch_thread(Duration::from_millis(100));

  ctrlc::set_handler(|| {
    println!("SIGINT!");
    thread_handle.stop();
    std::process::exit(0);
  }).expect("Can't initialize SIGINT");
}

fn the_whole_thing() {
  let time = Local::now().format("%b %e, %H:%M:%S").to_string();
  println!("[{}] I get executed every 10 minutes!", time);
}

// fn send_webhook(http_client: reqwest::Client) {
//   http_client.post("");
// }