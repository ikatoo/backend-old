use actix_web::{web, App, HttpServer};

static HOST:&str = "localhost";
static PORT:u32 = 8080;

mod modname {
    use actix_web::HttpResponse;

    use actix_web::Responder;

    pub(crate) async fn index() -> impl Responder {
        HttpResponse::Ok().body("New Hello, world!")
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().route("/", web::get().to(modname::index))
    })
    .bind(format!("{}:{}", HOST, PORT))?
    .run()
    .await
}