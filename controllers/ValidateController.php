<?php
class ValidateController {
 
    public static function validate($entityType, $data) {
        $validateCamps = [];
 
        switch ($entityType) {
            case 'Client':
                $validateCamps = ['nome', 'email', 'telefone', 'cpf', 'cargo_id', 'senha'];
                break;
            case 'Room':
                $validateCamps = ['nome', 'numero', 'qnt_cama_solteiro', 'qnt_cama_casal', 'preco', 'disponivel'];
                break;
            case 'Reserve':
                $validateCamps = ['pedido_id', 'quarto_id', 'adicional_id', 'inicio', 'fim'];
                break;
            case 'Request':
                $validateCamps = ['usuario_id', 'cliente_id', 'data', 'pagamento'];
                break;
            case 'Addon':
                $validateCamps = ['nome', 'preco'];
                break;
            default:
                return [
                    'true' => false,
                    'mensagem' => 'Tipo de entidade inválida para validação.'
                ];
        }
 
        return self::validarCampos($data, $validateCamps, $entityType);
    }
 
    private static function validarCampos($data, $validateCamps, $entidade) {
        $camposFaltantes = [];
       
        foreach ($validateCamps as $camps) {
            if (!isset($data[$camps]) || empty(trim($data[$camps]))) {
                $camposFaltantes[] = $camps;
            }
        }
       
        if (!empty($camposFaltantes)) {
            return [
                'true' => false,
                'mensagem' => "Erro! Os campos obrigatórios estão vazios em: $entidade",
                'campos_faltantes' => $camposFaltantes,
                'entidade' => $entidade
            ];
        }
 
        $errosValidate = self::validateTypesDatas($data, $entidade);
        if (!empty($errosValidate)) {
            return [
                'true' => false,
                'mensagem' => "Erros de validação em: $entidade",
                'erros_validacao' => $errosValidate,
                'entidade' => $entidade
            ];
        }
       
        return ['true' => true];
    }
 
    private static function validateTypesDatas($data, $entidade) {
        $erros = [];
       
        switch ($entidade) {
            case 'Cliente':
                if (isset($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                    $erros[] = 'Email inválido';
                }
                if (isset($data['cpf']) && !self::validarCPF($data['cpf'])) {
                    $erros[] = 'CPF inválido';
                }
                break;
               
            case 'Usuário':
                if (isset($data['nome']) && empty(trim($data['nome']))) {
                    $erros[] = 'O preenchimento do nome é obrigatório';
                }
                if (isset($data['senha']) && strlen($data['senha']) < 6) {
                    $erros[] = 'A senha deve ter pelo menos 6 caractéres';
                }
                break;
               
            case 'Reserva':
                if (isset($data['inicio']) && isset($data['fim'])) {
                    if (strtotime($data['inicio']) >= strtotime($data['fim'])) {
                        $erros[] = 'Data de checkin deve ser anterior à data de checkout';
                    }
                }
                break;
        }
       
        return $erros;
    }
       
    private static function validarCPF($cpf) {
        $cpf = preg_replace('/[^0-9]/', '', $cpf);
       
        if (strlen($cpf) != 11) {
            return false;
        }
        return true;
    }
}
 
?>