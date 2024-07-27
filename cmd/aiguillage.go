// The Go SDK for interacting with Aiguillage
package aiguillage

type AiguillageServer struct {
	url         string
	serviceName string
}

func New(url string, serviceName string) *AiguillageServer {
	return &AiguillageServer{url: url, serviceName: serviceName}
}

func (*AiguillageServer) GetConfig(key string) string {
	return ""
}

func (*AiguillageServer) SetConfig(key string, value string) {

}

func (*AiguillageServer) Log(severity string, message string) {

}
