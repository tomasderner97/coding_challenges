extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

// Reverse a string coming from JS 
#[wasm_bindgen]
pub fn reverse(s: String) -> String {
    s.chars().rev().collect::<String>()
}