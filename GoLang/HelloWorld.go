package main

import (
	"fmt"
	"net/http"
)

type Simple struct {
	va int
	vb string
}

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello from Go!")
}

func main() {
	var a []string
	a = append(a, "Acc", "Bcc")
	fmt.Printf("%+v\n", a)
	var m = make(map[string]interface{})
	m["Hello"] = "World"
	m["Integer"] = 132
	fmt.Printf("%+v\n", m)


}
