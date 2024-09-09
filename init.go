package main

import (
	"github.com/phaier/p-init/copy"
	"github.com/spf13/cobra"
)

func main() {
	rootCmd := &cobra.Command{
		Version: "0.0.2",
		Use:     "p-init [command] [options]",
	}

	copyCmd := &cobra.Command{
		Use:   "copy [template]",
		Short: "初期化します",
		Long:  `初期化します`,
		RunE: func(cmd *cobra.Command, args []string) error {
			template := args[0]
			err := copy.Copy(template)
			if err != nil {
				return err
			}

			return nil
		},
	}
	rootCmd.AddCommand(copyCmd)

	err := rootCmd.Execute()
	if err != nil {
		panic(err)
	}
}
