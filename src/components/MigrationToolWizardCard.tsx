import { Card, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

type MigrationToolWizardCardProps = {
    cardTitle: string
    description: string
    icon: React.ElementType
    onClick: () => void
};

export default function MigrationToolWizardCard({
                                                    cardTitle,
                                                    description,
                                                    onClick,
                                                    icon,
                                                }: MigrationToolWizardCardProps) {

    const Icon = icon;

    return (
        <Card
            hoverable
            onClick={onClick}
            style={{
                width: 320,
                height: 220,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "all 0.2s ease",
            }}
        >
            <div style={{ marginBottom: 16, textAlign: "center" }}>
                <Icon style={{ fontSize: 48 }} />
            </div>

            <Title level={5} style={{ marginBottom: 8, textAlign: "center" }}>
                {cardTitle}
            </Title>

            <Text type="secondary" style={{ textAlign: "center" }}>
                {description}
            </Text>
        </Card>
    );
}
