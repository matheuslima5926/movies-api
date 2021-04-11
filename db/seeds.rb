# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
    admin = User.create(email: "adm@movies-api.com", password: "@mySecretPassword_#45")
    movies = Movie.create([
        { original_title: "Lord of the Rings", director: "Peter Jackson", release_date: Date.parse("2001-01-01") },
        { original_title: "Avengers - End Game", director: "Russo Brothers", release_date: Date.parse("2019-12-23") },
        { original_title: "Avatar", director: "James Cameron", release_date: Date.parse("2009-10-11") }
    ])
